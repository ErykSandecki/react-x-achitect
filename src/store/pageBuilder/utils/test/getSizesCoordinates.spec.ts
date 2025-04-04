// types
import { Anchor } from 'store/pageBuilder/enums';

// utils
import { getSizesCoordinates } from '../getSizesCoordinates';

const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
const mouseCoordinates = { x: 200, y: 100 };

describe('getSizesCoordinates', () => {
  it(`should return cords east`, () => {
    // before
    const result = getSizesCoordinates(
      Anchor.east,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      height: 100,
      position: { x: 0, y: 0 },
      width: 300,
    });
  });

  it(`should return cords east reverse`, () => {
    // before
    const result = getSizesCoordinates(Anchor.east, baseCoordinates, 100, 100, {
      ...mouseCoordinates,
      x: -300,
    });

    // result
    expect(result).toStrictEqual({
      height: 100,
      position: { x: -200, y: 0 },
      width: 200,
    });
  });

  it(`should return cords north`, () => {
    // before
    const result = getSizesCoordinates(
      Anchor.north,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      height: 0,
      position: { x: 0, y: 100 },
      width: 100,
    });
  });

  it(`should return cords north reverse`, () => {
    // before
    const result = getSizesCoordinates(
      Anchor.north,
      baseCoordinates,
      100,
      100,
      { ...mouseCoordinates, y: -300 },
    );

    // result
    expect(result).toStrictEqual({
      height: 400,
      position: { x: 0, y: -300 },
      width: 100,
    });
  });

  it(`should return cords north east`, () => {
    // before
    const result = getSizesCoordinates(
      Anchor.northEast,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      height: 0,
      position: { x: 0, y: 100 },
      width: 300,
    });
  });

  it(`should return cords north west`, () => {
    // before
    const result = getSizesCoordinates(
      Anchor.northWest,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      height: 0,
      position: { x: 100, y: 100 },
      width: 100,
    });
  });

  it(`should return cords south`, () => {
    // before
    const result = getSizesCoordinates(
      Anchor.south,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      height: 200,
      position: { x: 0, y: 0 },
      width: 100,
    });
  });

  it(`should return cords south east`, () => {
    // before
    const result = getSizesCoordinates(
      Anchor.southEast,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      height: 200,
      position: { x: 0, y: 0 },
      width: 300,
    });
  });

  it(`should return cords south west`, () => {
    // before
    const result = getSizesCoordinates(
      Anchor.southEast,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      height: 200,
      position: { x: 0, y: 0 },
      width: 300,
    });
  });

  it(`should return cords west`, () => {
    // before
    const result = getSizesCoordinates(
      Anchor.west,
      baseCoordinates,
      100,
      100,
      mouseCoordinates,
    );

    // result
    expect(result).toStrictEqual({
      height: 100,
      position: { x: 100, y: 0 },
      width: 100,
    });
  });
});
