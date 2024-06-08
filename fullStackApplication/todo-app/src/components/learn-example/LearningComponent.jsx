import Firstcomponent from './Firstcomponent';
import Secondcomponent from './Secondcomponent';
import Thirdcomponent from './Thirdcomponent';
import LearningJavaScript from './LearningJavaScript';

export default function LearningComponent() {
    return (
      <div className="LearningComponent">
       <Firstcomponent/>
       <Secondcomponent/>
       <Thirdcomponent/>
       <LearningJavaScript/>
      </div>
    );
  }