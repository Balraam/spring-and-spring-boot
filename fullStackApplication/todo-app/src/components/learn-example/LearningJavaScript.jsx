const person ={
    name:'Balram verma',
    Address: {
        line:'gram pachama',
        city:'Salichouka Road',
        country:'India'
    },
    profiles:['instagram','facebook','linkedin'],
    printProfile: () => { person.profiles.map(profile => console.log(profile))}

}

export default function LearningJavaScript(){
return(
    <>
    <div>{person.name}</div>
    <div>{person.Address.line}</div>
    <div>{person.profiles[0]}</div>
    <div>{person.printProfile()}</div>
    </>
)
}