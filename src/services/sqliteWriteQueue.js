let writeChain = Promise.resolve();

export function enqueueSqliteWrite(task) {
  const nextWrite = writeChain.then(() => task());

  writeChain = nextWrite.catch(() => {
    // mantenemos viva la cola aunque una escritura falle
  });

  return nextWrite;
}