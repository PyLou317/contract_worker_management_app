function getAcronym(str) {
    if (!str) {
      return '';
    }
    return str
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
}
  
export default getAcronym;