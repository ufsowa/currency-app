import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
    const testInput = {amount: 100, from: 'PLN', to: 'USD'};

    it('should render without crashing', () => {
        render(<ResultBox {...testInput} />);
      });
    it('should render proper info about conversion when PLN->USD', () => {
        const testCases = [
            { input: { amount: 100, from: 'PLN', to: 'USD' }, expected: 'PLN 100.00 = $28.57'},
            { input: { amount: 110, from: 'PLN', to: 'USD' }, expected: 'PLN 110.00 = $31.43'},
            { input: { amount: 200.0, from: 'PLN', to: 'USD'}, expected: 'PLN 200.00 = $57.14'},
            { input: { amount: 345.3, from: 'PLN', to: 'USD' }, expected: 'PLN 345.30 = $98.66'},
        ] ;

        for (const testObj of testCases){
            render(<ResultBox {...testObj.input} />);
            const resultField = screen.getByTestId('result-div');
            expect(resultField).toHaveTextContent(testObj.expected);
            cleanup();
        }
    });
    it('should render proper info about conversion when USD->PLN', () => {
        const testCases = [
            { input: { amount: 100, from: 'USD', to: 'PLN' }, expected: '$100.00 = PLN 350.00'},
            { input: { amount: 110, from: 'USD', to: 'PLN' }, expected: '$110.00 = PLN 385.00'},
            { input: { amount: 200.0, from: 'USD', to: 'PLN'}, expected: '$200.00 = PLN 700.00'},
            { input: { amount: 345.3, from: 'USD', to: 'PLN' }, expected: '$345.30 = PLN 1,208.55'},
        ] ;

        for (const testObj of testCases){
            render(<ResultBox {...testObj.input} />);
            const resultField = screen.getByTestId('result-div');
            expect(resultField).toHaveTextContent(testObj.expected);
            cleanup();
        }
    });
    it('should render proper info about conversion when from equal to', () => {
        const testCases = [
            { input: { amount: 100, from: 'USD', to: 'USD' }, expected: '$100.00 = $100.00'},
            { input: { amount: 110.10, from: 'USD', to: 'USD' }, expected: '$110.10 = $110.10'},
            { input: { amount: 200.0, from: 'PLN', to: 'PLN'}, expected: 'PLN 200.00 = PLN 200.00'},
            { input: { amount: 345.3, from: 'PLN', to: 'PLN' }, expected: 'PLN 345.30 = PLN 345.30'},
        ] ;

        for (const testObj of testCases){
            render(<ResultBox {...testObj.input} />);
            const resultField = screen.getByTestId('result-div');
            expect(resultField).toHaveTextContent(testObj.expected);
            cleanup();
        }
    });
    it('should render proper info about conversion when invalid input', () => {
        const testCases = [
            { amount: -100, from: 'PLN', to: 'USD' },
 //           { amount: [], from: 'USD', to: 'USD' },
 //           { amount: 'text', from: 'PLN', to: 'PLN'},
 //           { amount: undefined, from: 'PLN', to: 'PLN' },
        ] ;

        for (const testObj of testCases){
            render(<ResultBox {...testObj} />);
            const resultField = screen.getByTestId('result-div');
            expect(resultField).toHaveTextContent('Wrong amount value!!');
            cleanup();
        }
    });
});