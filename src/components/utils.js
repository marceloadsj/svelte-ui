function omit(props, keys) {
  const parsedProps = { ...props };

  keys.forEach(key => {
    delete parsedProps[key];
  });

  return parsedProps;
}

export { omit };
