#include <libopencm3/stm32/rcc.h>
#include <libopencm3/stm32/gpio.h>

int main()
{
    rcc_clock_setup_in_hse_8mhz_out_72mhz();
    
    // configuración del LED (PC13)
    rcc_periph_clock_enable(RCC_GPIOC);
    gpio_set_mode(
        GPIOC,
        GPIO_MODE_OUTPUT_2_MHZ,
        GPIO_CNF_OUTPUT_PUSHPULL,
        GPIO13);

    while (1)
    {
        gpio_toggle(GPIOC,GPIO13);
        for(uint32_t i=0; i < 7200000; ++i)
            __asm__("nop");
    }
}