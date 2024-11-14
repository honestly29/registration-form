/**
 * @jest-environment jsdom
 */
import { isFieldEmpty } from 'src/validations/formValidation.js';
import { setErrorMessage } from 'src/dom/domUtils.js';

jest.mock('src/dom/domUtils.js', () => ({
  setErrorMessage: jest.fn()
}));

describe('isFieldEmpty', () => {
    test('returns true and sets error message if field is empty', () => {
      const result = isFieldEmpty('fname');
      expect(result).toBe(true);
      expect(setErrorMessage).toHaveBeenCalledWith('fname', 'Field cannot be left blank');
    });
});