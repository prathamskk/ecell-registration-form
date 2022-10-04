export const onChangePerf = (e, perf, setPerf) => {
  const name = e.target.name;
  const value = e.target.value;

  setPerf({ ...perf, [name]: value });
};
