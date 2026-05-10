type ApiResponse<D, M> = {
  message?: string;
  data?: D;
  meta?: M;
};

export function apiResponse<D, M>({ message, data, meta }: ApiResponse<D, M>) {
  return {
    success: true,
    message,
    data,
    ...(meta && { meta }),
  };
}
