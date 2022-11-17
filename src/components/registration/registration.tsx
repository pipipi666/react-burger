import style from "./style.module.scss";
import { useHistory } from "react-router-dom";
import { FormEvent, ReactNode } from "react";
import { Button } from "utils/libComponentsWithTypes";

interface ILink {
  text: string;
  button: string;
  path: string;
}

interface IProps {
  title: string;
  buttonName: string;
  links: Array<ILink>;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export default function Registration({
  title,
  buttonName,
  links,
  handleFormSubmit,
  children,
}: IProps) {
  const history = useHistory();
  const handleClick = (path: string) => {
    history.push(path);
  };

  return (
    <div className={style.wrapper}>
      <form className={style.main} onSubmit={handleFormSubmit}>
        <h2 className="text text_type_main-medium mt-10">{title}</h2>
        {children}
        <Button htmlType="submit" type="primary" size="large">
          {buttonName}
        </Button>
      </form>
      {links.map((item, index: number) => (
        <p
          key={index}
          className="text text_type_main-default text_color_inactive mb-4"
        >
          <span className="pr-2">{item.text}</span>
          <Button type="secondary" onClick={() => handleClick(item.path)}>
            {item.button}
          </Button>
        </p>
      ))}
    </div>
  );
}
