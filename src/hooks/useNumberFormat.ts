function useNumberFormat(number: string | number) {
  if (number !== null && number !== undefined) {
    if (typeof number === "number") {
      return number.toLocaleString();
    } else {
      const parsedNumber = parseInt(number, 10);
      if (isNaN(parsedNumber)) {
        return "0";
      }
      return parsedNumber.toLocaleString();
    }
  } else {
    return "0";
  }
}

export default useNumberFormat;
