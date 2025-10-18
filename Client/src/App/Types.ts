



export interface ICourse {
  _id: string;
  title: string;
  about: string;
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: {
    sectionTitle: string;
    lessons: string[];
  }[];
  price: number;
  state: "draft" | "published" | "archived";
  category: string;
  coverImage: string;
  duration: string; // e.g. "6h 30m"
  owner: string; // Teacher reference
  video: string;
}

export interface User {
  _id: string;
  email: string;
  role: "student" | "teacher";
  name: string;
  profileimg?: string;
}


export interface state {
  title: string;
  value: number;
  color: string;
}

export interface Teacher {
  _id: string;
  name: string;
  profileimg?: string;
  bio?: string;
  Experiences?: string;
  domain?: string;
  Courses: ICourse[];
}

export interface Student {
  _id: string;
  name: string;
  email: string;
  profileimg?: string;
  bio?: string;
}