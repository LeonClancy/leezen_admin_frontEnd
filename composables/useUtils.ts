export default function useUtils() {
    function dateFormaterYYMMDD(date: Date) {
        return `${date.getFullYear()}/${date.getMonth()<10?'0':''}${date.getMonth()}/${date.getMonth()<10?'0':''}${date.getDay()}`;
    }
    return {
        dateFormaterYYMMDD
    };
}
