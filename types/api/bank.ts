

export interface Bank {
  id: number;
  name: string;
  code: string;
}

export type Banks = Bank[];


export type BanksResponse = {
  banks: Banks
  message: string;
  status: number;
};

