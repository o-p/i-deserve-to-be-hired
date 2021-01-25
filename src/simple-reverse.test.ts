import reverse from './simple-reverse';

describe('簡單版反轉，僅能容忍最簡單的輸入值（輸入值需合法且多 keys 不能選擇）', (): void => {
  const exampleInput = { hired: { be: { to: { deserve: 'I' } } } };
  const exampleOutput = { I: { deserve: { to: { be: 'hired' } } } };

  test.each`
    input                              | expected
    ${exampleInput}                    | ${exampleOutput}
    ${{ hello: 'world' }}                | ${{ world: 'hello' }}
    ${{ one: 'only', two: 'disappear' }} | ${{ only: 'one' }}
  `(
    '$input',
    ({ input, expected }) => expect(reverse(input)).toEqual(expected),
  );
});
