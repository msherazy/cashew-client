export interface UserData {
  success: boolean;
  data: {
    name: string;
    email: string;
    mobile: number;
    emiratesIdName: string;
    emiratesIdNumber: string;
    idImages: {
      front: {
        name: string;
        url: string;
      };
      back: {
        name: string;
        url: string;
      };
    };
  };
}
