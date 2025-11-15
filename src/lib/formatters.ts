export function dateFormatter(date: Date) {
    const formatter = new Intl.DateTimeFormat(
        ["sv-SE"], {
            dateStyle: "full"
        }
    )
    return formatter.format(date)
}

export function quantityFormatter(value: number) {
    const formatter = new Intl.NumberFormat(
        ["sv-SE"], {
            style: "decimal"
        }
    )
    return formatter.format(value)
}

export function currencyFormatter(value: number) {
    const formatter = new Intl.NumberFormat(
        ["sv-SE"], {
            currency: "SEK",
            style: "currency",
        }
    )
    return formatter.format(value)
}

export function percentageFormatter(value: number) {
    const formatter = new Intl.NumberFormat(
        ["sv-SE"], {
            style: "percent",
            minimumFractionDigits: 2
        }
    )
    return formatter.format(value)
}