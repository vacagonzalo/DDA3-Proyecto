export interface Reading {
    id: number
    deviceId: number
    temperature: number
    humidity: number
    actuator: boolean
    createdAt: Date
}