import React from 'react';
import NavBar from '../components/NavBar';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

class Legal extends React.Component {

    render() {
        const {history} = this.props;
        return (
            <>
                <NavBar history={history}/>
                <Box component="span" m={1}>
                    <Container maxWidth="lg" //TODO change below to correct version
                    ><br />
                        <h1>Impressum</h1>
                        Alexander Kutschera<br />
                        Zennerstraße 34<br />
                        81379 München

                        E-Mail zusammenzuhause@hotmail.com<br/>
                        Tel 049-176-20475<br/>
                        <strong>Haftung für Inhalte</strong><p>
                        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                        Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                        nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
                        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
                        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                        Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
                        der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                        Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                    </p>
                        <strong>
                            Datenschutz
                        </strong>
                        <p>
                            Die Nutzung unserer Webseite ist in der Regel ohne eine Angabe personenbezogener Daten
                            möglich.
                            Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder
                            E-Mail-Adresse) erhoben werden, erfolgt dies – soweit es möglich ist– immer auf freiwilliger
                            Basis. Wir geben Ihre Daten ohne Ihre ausdrückliche Zustimmung nicht an Dritte weiter.
                            Außerdem
                            weisen wir Sie darauf hin, dass die Datenübertragung im Internet (wie beispielsweise bei der
                            Kommunikation über E-Mail) Sicherheitslücken aufweisen kann. Denn ein lückenloser Schutz der
                            Daten vor dem Zugriff durch Dritte ist nicht möglich. Wir widersprechen hiermit ausdrücklich
                            der
                            Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur
                            Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien. Die
                            Betreiber dieser Seiten behalten sich ausdrücklich vor, im Fall der unverlangten Zusendung
                            von
                            Werbeinformationen, etwa durch Spam-Mails, rechtliche Schritte einzuleiten.</p><i><a
                        href="http://www.agb.de">Gratis Impressum</a> von agb.de</i>


                    </Container>
                </Box>

            </>
        );
    }
}

export default Legal;
