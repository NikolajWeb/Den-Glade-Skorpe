
/* Components */
import InfoSection from "../components/infoSection/infoSection";
import KontaktForm from "../components/kontakt/kontaktForm/kontaktForm";

const Kontakt = () => {
  return (
    <article>
        <InfoSection
        title={"Har du spørgsmål eller ønsker du at bestille din favoritpizza?"}
        info={`Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi glæder os til at høre fra dig!`}
        />
        <KontaktForm/>
    </article>
  );
};

export default Kontakt;