import codegen from 'codegen.macro';
// function to use latter to mock Worker in jest
export const getWebWorker = () => {
  let worker;
  if (typeof worker === 'undefined') {
    worker = new Worker(
      new URL(
        '../helpers/worker.ts',
        // to solve problem with Cannot use 'import.meta' outside a module  during tests
        codegen`module.exports = process.env.NODE_ENV === "test" ? "url.com" : "import.meta.url"`
      ),
      {
        name: 'aiMoveWorker',
        type: 'module',
      }
    );
  }
  return worker;
};
