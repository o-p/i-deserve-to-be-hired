import reverse from './reverse';

describe('可自訂要選用哪個 child node，有簡單容錯機制', (): void => {
  const exampleInput = { hired: { be: { to: { deserve: 'I' } } } };
  const exampleOutput = { I: { deserve: { to: { be: 'hired' } } } };

  const getLargest = (entries) => entries.reduce((a, b) => b[0] > a[0] ? b : a);

  const largeTree = {
    獎: {
      大: { 要: '我' },
      頭: {
        中: { 牙: '尾' },
        不到: { 抽: '其他人' },
      },
    },
  };

  test.each`
    params                     | expected                              | comments
    ${[exampleInput]}          | ${exampleOutput}                      | ${'考題本身'}
    ${[null]}                  | ${null}                               | ${'容錯: null'}
    ${[{}]}                    | ${{}}                                 | ${'容錯: empty object'}
    ${[largeTree]}             | ${{ 我: { 要: { 大: '獎' } } }}         | ${'使用預設 filter'}
    ${[largeTree, getLargest]} | ${{ 尾: { 牙: { 中: { 頭: '獎' } } } }} | ${'套用自定義 node filter'}
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
