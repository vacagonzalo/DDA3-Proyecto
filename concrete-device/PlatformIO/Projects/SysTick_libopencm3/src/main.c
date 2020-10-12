#include <libopencm3/stm32/rcc.h>
#include <libopencm3/stm32/gpio.h>
#include <libopencm3/cm3/systick.h>

volatile uint32_t millis;

/** @brief delay_ms makes a blocking delay in milli seconds.
 * 
 * This function uses a systick frecuency of 1MHz in order to work
 * it is importan to configure it correctly.
 * 
 * @param[in] millis uint32_t The desire delay in ms
 */
void delay_ms(uint32_t ms)
{
    uint32_t lm = millis;
    while ((millis-lm) < ms);    
}

int main()
{
    rcc_clock_setup_in_hse_8mhz_out_72mhz();
    rcc_periph_clock_enable(RCC_GPIOC);
    gpio_set_mode(
        GPIOC, GPIO_MODE_OUTPUT_2_MHZ,GPIO_CNF_OUTPUT_PUSHPULL, GPIO13);
    //systick_set_clocksource(STK_CSR_CLKSOURCE_AHB_DIV8); // 78M/8 = 9M
    //systick_set_reload(8999); // 9M/9000 = 1M => T = 1ms
    systick_set_frequency(1000,rcc_ahb_frequency);
    systick_counter_enable();
    systick_interrupt_enable();
    
    while (1)
    {
        gpio_toggle(GPIOC,GPIO13);
        delay_ms(1000);
    }
    
}

void sys_tick_handler()
{
    millis++;
}