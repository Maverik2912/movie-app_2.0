const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
export const dateFormatter = (str: string): string => {
    const dateArr = str.split('-');
    const monthId = +dateArr[1] - 1;
    return `${dateArr[2]} ${months[monthId]} ${dateArr[0]}`;
}