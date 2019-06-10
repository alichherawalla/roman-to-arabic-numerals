import get from 'lodash/get'
import {RESULT_TYPE, resultWrapper} from '../../utils/responseUtils';
import {ERROR_MESSAGE, ROMAN_NUMERALS} from '../../utils/constants';

export function convertRomanToArabic(req, res) {
  if (req.query.roman) {
    const romanNumber = req.query.roman.toUpperCase();
    let sum = 0;
    let index = 0;
    while (index < romanNumber.length) {

      const romanNumeral = romanNumber[index];
      const result = evaluateRomanNumeral(romanNumber, romanNumeral, index);

      // check if the evaluated value is 0 which means the roman numeral was invalid
      if (!result.value) {
        return resultWrapper(res, RESULT_TYPE.error, ERROR_MESSAGE.invalidRomanNumeral);
      }

      index = result.index;
      sum += result.value;
    }
    // return the equivalent arabic number
    return resultWrapper(res, RESULT_TYPE.success, sum);
  }
  // since the query parameter roman was missing return an error
  return resultWrapper(res, RESULT_TYPE.error, ERROR_MESSAGE.emptyRomanNumeral);
}


const evaluateRomanNumeral = (romanNumber, romanNumeral, index) => {
  const currentDecimal = convertRomanToDecimal(romanNumeral);
  index = index + 1;
  if (currentDecimal && romanNumber.length > index) {
    const nextDecimal = convertRomanToDecimal(romanNumber[index]);
    let value = 0;
    if (nextDecimal > currentDecimal) {
      return {value: nextDecimal - currentDecimal, index: index + 1}
    }
    return {value: currentDecimal, index};
  }
  return {value: currentDecimal, index};
};

const convertRomanToDecimal = romanNumeral => get(ROMAN_NUMERALS, `[${romanNumeral}]`, 0);


