module.exports = (module, guess, context, reflection) => {
  if (/custom\.ts$/.exec(reflection.name)) {
    return 'custom_module';
  } else {
    return module || guess;
  }
};
