import reverse from './reverse';

describe('可自訂要選用哪個 child node，有簡單容錯機制', (): void => {
  const exampleInput = { hired: { be: { to: { deserve: 'I' } } } };
  const exampleOutput = { I: { deserve: { to: { be: 'hired' } } } };

  const getLargest = (entries) => entries.reduce((a, b) => b[0] > a[0] ? b : a);

  const complex = {
    獎: {
      大: { 要: '我' },
      頭: {
        中: { 牙: '尾' },
        不到: { 抽: '其他人' },
      },
    },
  };

  const defaultResultOfComplexTree = { 我: { 要: { 大: '獎' } } };
  const customResultOfComplexTree = { 尾: { 牙: { 中: { 頭: '獎' } } } };

  const multiple = {
    boolean: true,
    null: null,
    number: 2,
    string: '1',
  };

  const nth = (n) => (entries) => entries[n];

  test.each`
    params                                   | expected                      | comments
    ${[exampleInput]}                        | ${exampleOutput}              | ${'基本測試'}
    ${[null]}                                | ${null}                       | ${'無法處理的 input，輸入值非 Object instance'}
    ${[{}]}                                  | ${null}                       | ${'無法處理的 input，底層為空物件'}
    ${[{ one: {} }]}                         | ${null}                       | ${'無法處理的 input，一層為空物件'}
    ${[{ two: { one: {} } }]}                | ${{ one: 'two' }}             | ${'部分可處理的 input，二層後出現空物件'}
    ${[complex]}                             | ${defaultResultOfComplexTree} | ${'使用預設 filter'}
    ${[complex, getLargest]}                 | ${customResultOfComplexTree}  | ${'套用自定義 node filter'}
    ${[multiple]}                            | ${{ true: 'boolean' }}        | ${'使用預設 filter，處理特殊 value'}
    ${[multiple, nth(0)]}                    | ${{ true: 'boolean' }}        | ${'自定義 filter，value 為 boolean'}
    ${[multiple, nth(1)]}                    | ${{ null: 'null' }}           | ${'自定義 filter，value 為 null'}
    ${[multiple, nth(2)]}                    | ${{ 2: 'number' }}            | ${'自定義 filter，value 為 number'}
    ${[multiple, nth(3)]}                    | ${{ 1: 'string' }}            | ${'自定義 filter，value 為 string'}
    ${[multiple, () => null]}                | ${null}                       | ${'自定義 filter，底層回 null'}
    ${[{ multiple }, () => null]}            | ${null}                       | ${'自定義 filter，一層回 null'}
    ${[{ nodes: { multiple } }, () => null]} | ${{ multiple: 'nodes' }}      | ${'自定義 filter，二層後回 null，應可以顯示部分結果'}
  `(
    '$comments',
    ({ params, expected }) => expect(reverse(...params)).toEqual(expected),
  );
});

/*

${[null]}          | ${null}                         | ${'容錯: null'}
    ${[{}]}            | ${{}}                           | ${'容錯: empty object'}
    ${[largeTree]}             | ${{我:{要:{大:'獎'}}}}       | ${'使用預設 filter'}
    ${[largeTree, getLargest]} | ${{尾:{牙:{中:{頭: '獎'}}}}} | ${'套用自定義 node filter'}
*/
