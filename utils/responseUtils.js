export const RESULT_TYPE = {
  error: 0,
  success: 1
};
export const resultWrapper = (response, type, result) => {
  if (type) {
    return response.json(result);
  } else {
    response.status(result.status);
    return response.json({status: 'Error', message: result.message});
  }
};


