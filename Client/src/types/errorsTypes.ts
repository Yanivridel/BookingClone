export type CreateBookingErrorResponse = {
  status: number;
  message: string;
  roomId?: string;
  notAvailableDate?: string;
};
