module.exports = function (explicit, automatic, filename, context, reflection) {
  // Only do custom mapping if the sources are coming from the test/src/custom directory
  if (/test.src.custom/.exec(filename)) {
    // cUsToM_MoDuLe
    return automatic
      .split('')
      .map((char, idx) => (idx % 2 === 1 ? char.toUpperCase() : char))
      .join('');
  } else {
    return explicit || automatic;
  }
};
