
/* Components */
import InfoSection from "../components/infoSection/infoSection";
import PersonaleCard from "../components/personalet/personaletCard";

const Personalet = () => {
  return (
    <article>
        <InfoSection
        title={"Personalet hos Den Glade Skorpe"}
        info={`Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der altid går den ekstra mil for at sikre, at kunderne får den bedste oplevelse. Teamet består af erfarne pizzabagere, der med passion tilbereder lækre pizzaer med friske råvarer.`}
        />
        <PersonaleCard/>
    </article>
  );
};

export default Personalet;