// Import the dependencies for testing
import chai from 'chai';
import _ from 'lodash';
import chaiHttp from 'chai-http';
import app from '../../server/index';
import {ERROR_MESSAGE} from "../../utils/constants";
// Configure chai
chai.use(chaiHttp);
chai.should();

// url to be tested for conversion of roman to arabic numerals
const URL = '/api/convert-to-arabic?roman=';

// valid roman numerals
const validRomanNumerals = [
  {roman: 'XVIII', arabic: 18},
  {roman: 'VI', arabic: 6},
  {roman: 'IV', arabic: 4},
  {roman: 'xxi', arabic: 21},
  {roman: 'xix', arabic: 19},
  {roman: 'XXX', arabic: 30},
  {roman: 'XLIX', arabic: 49},
  {roman: 'LXX', arabic: 70}
];

// invalid roman numerals
const invalidRomanNumerals = [
  {roman: 'XFVIII', error: ERROR_MESSAGE.invalidRomanNumeral},
  {roman: '', error: ERROR_MESSAGE.emptyRomanNumeral},
  {error: ERROR_MESSAGE.emptyRomanNumeral}
];

describe('convertRomanToArabic', () => {

  it('Testing valid roman numeral inputs', () => {
    _.forEach(validRomanNumerals, (item) => {
      chai.request(app)
        .get(URL + item.roman)
        .end((err, res) => {
          res.body.should.be.eq(item.arabic);
        })
    });
  });

  it('Testing invalid roman numeral inputs', () => {
    _.forEach(invalidRomanNumerals, (item) => {
      chai.request(app)
        .get(URL + _.get(item, 'roman', ''))
        .end((err, res) => {
          res.should.have.status(item.error.status);
          res.body.should.be.eql({status: 'Error', message: item.error.message});
        })
    });
  });
});
