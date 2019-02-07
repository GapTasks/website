import test from 'tape';

import { incrementAsync } from './sagas'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync()

  // now what ?
  assert.deepEqual(
      gen.next(),
      {done: false, value: ""}
  );
});