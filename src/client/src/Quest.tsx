import "./App.css";

import { Checkbox } from "@progress/kendo-react-inputs";
import sampleImage from "./assets/icon.svg";
import { useParams } from "react-router";
import { useEffect, useState, type ReactElement } from "react";

import { type Quest } from "../../shared/schemas/quest";

function SingleQuestPage(): ReactElement {
  const { questId } = useParams();
  let [ quest, setQuest ] = useState<Quest>();

  useEffect(() => {
    fetch(`/api/quest/${questId}`).then(body => body.json()).then((q: Quest) => {
      setQuest(q);
    })
  }, [questId])

  return (
    <div style={{ margin: "1rem" }}>
      <img src={sampleImage} alt="QuestImage" style={{maxHeight: 200, margin:'0 auto', display:'block'}} />
      <div>
        <div className="example-wrapper">
          <div className="page">
            <div className="content"></div>
          </div>
        </div>
      </div>
      <hr />
      <h3>{quest?.displayName}</h3>
      <p>{quest?.description}</p>

      {quest && quest.tasks.map((t) => (
        <ul key={t.id}>
          <li style={{ display: "flex", "gap": "1rem" }}>
            <Checkbox defaultChecked={t.completed} disabled={true} size={"large"} />{" "}
            {t.displayName}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default SingleQuestPage;
