import s from "./category.module.css";


export default function Category({data}) {
  return (
    <ul className={s.list}>
      {data?.category.map((item) => (
        <li key={item.id}>
          <div className={s.containerTab}>
            <div className={s.leftContainer}>
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "24px",
                  backgroundColor: `${item.color}`,
                  marginRight: "16px",
                }}
              ></span>
             <p className={s.name}>{item.name}</p>
            </div>
            {item.total !==0  &&<p className={s.name}>{item.total.toFixed(2)}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
