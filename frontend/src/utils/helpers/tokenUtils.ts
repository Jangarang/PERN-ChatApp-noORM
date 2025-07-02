export const isTokenExpired = (timeLeft: number) => {
    const now = Date.now();

    return now >= timeLeft;
};

export const tokenTimeLeft = (timeLeft: number) => {
    const now = Date.now();

    const time = timeLeft - now;
    return time;
}