export interface IChart {
        min: number,
        max: number,
        intervals: [{
                from: number,
                to: number,
                count: number
        }]
}