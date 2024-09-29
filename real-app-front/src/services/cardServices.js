import httpService from "./httpService";
import usersService from "./usersService";

export function createCard(card) {
  usersService.refreshToken();
  return httpService.post("/cards", card);
}
export function deleteCard(cardId) {
  return httpService.delete(`/cards/${cardId}`);
}
export function likeUnlikeCard(cardId) {
  return httpService.patch(`/cards/${cardId}`);
}
export function getCardById(cardId) {
  return httpService.get(`/cards/${cardId}`);
}
