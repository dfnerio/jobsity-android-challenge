interface MockSuccessfullResponseProps {
  status?: number;
  returnBody?: object;
}

export const mockSuccesfulResponse = ({
  status = 200,
  returnBody,
}: MockSuccessfullResponseProps) => {
  global.fetch = jest.fn().mockImplementationOnce(() => {
    return new Promise(resolve => {
      resolve({
        ok: true,
        status,
        json: () => {
          return returnBody ? returnBody : {};
        },
      });
    });
  });
};
