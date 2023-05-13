export function getDayFormat(importTime, separator = " ") {
    // будем сравнивать две даты: 1)текущее время и 2) дату, которую получили в ф-ции
    const currentTime = new Date();

    // Преобразуем дату из строки в объект даты
    const time = new Date(Number(importTime));

    // сначала сравниваем года
    const yearDiff = currentTime.getFullYear() - time.getFullYear();
    if (yearDiff === 0) {
        // сравниваем месяца
        const monthDiff = currentTime.getMonth() - time.getMonth();
        if (monthDiff === 0) {
            // сравниваем часы
            const hoursDiff = currentTime.getHours() - time.getHours();
            if (hoursDiff === 0) {
                // сравниваем минуты по 30, 10, 5, 1
                const minutesDiff =
                    currentTime.getMinutes() - time.getMinutes();

                if (minutesDiff >= 30 && minutesDiff < 60) {
                    return "30 мин назад";
                }
                if (minutesDiff >= 10 && minutesDiff < 30) {
                    return "10 мин назад";
                }
                if (minutesDiff >= 5 && minutesDiff < 10) return "5 мин назад";
                if (minutesDiff >= 0 && minutesDiff < 5) return "1 мин назад";
            }
            return time.getHours() + time.getMinutes();
        }
        return time.getDay() + time.getMonth();
    }
    return (
        time.getDate() +
        separator +
        time.toLocaleString("en-US", { month: "long" }) +
        separator +
        time.getFullYear()
    );
}
