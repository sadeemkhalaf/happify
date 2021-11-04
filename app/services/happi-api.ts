

// async function getUserBoards(withLoader: boolean = true) {
//   try {
//     withLoader && MoogliLoader.show();
//     let allBoardsResults = await AuthApiService.getRequest(`${MoogliEndpoints.USER_BOARDS}/board`) || [];
    
//     allBoardsResults = allBoardsResults?.map((board) => {return {name: board.name, id_txt: board.id_txt, record_updated_at: board.record_updated_at}});
//     return allBoardsResults;
    
//   } catch (err: any | GeneralApiProblem) {
//     Logger.MoogliLogError(arguments.callee.name, err);
//     throw err;
//   } finally {
//     withLoader && MoogliLoader.hide();
//   }
// }


export {
  getAllArtists,
};
