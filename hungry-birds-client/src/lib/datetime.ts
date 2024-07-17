export const formatShortDate = (date: string | Date | undefined): string => {
    if (!date) return ''

    return new Date(date)?.toLocaleString('no-NB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
}

export const formatShortTime = (date: string | Date | undefined): string => {
    if (!date) return ''
    return new Date(date).toLocaleString('no-NB', {
        hour: '2-digit',
        minute: '2-digit',
    })
}

export const formatLongDateTime = (date: string | Date | undefined): string => {
    if (!date) return ''
    const formattedDate = new Date(date).toLocaleString('no-NB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })

    const formattedTime = new Date(date).toLocaleString('no-NB', {
        hour: '2-digit',
        minute: '2-digit',
    })

    return `${formattedDate} kl ${formattedTime}`
}

export const formatLocalDateLong = (date: string | Date | undefined): string => {
    if (!date) return ''
    return new Date(date).toLocaleString('no-NB', {
        day: '2-digit',
        month: 'long',
    })
}
