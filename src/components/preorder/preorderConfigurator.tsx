import { useEffect, useState } from "react";
import {
  preorderConfig,
  type AllowedPreorderQuantity,
} from "../../data/preorderConfig";
import { supabase } from "../../lib/supabaseClient";

type Quote = {
  quantity: AllowedPreorderQuantity;
  unitPriceCents: number;
  subtotalCents: number;
  shippingCostCents: number;
  totalCents: number;
  currency: "eur";
  estimatedShippingDate: string;
};

type ConnectedAccount = {
  email: string;
  nickname: string;
  accessToken: string;
};

function formatCents(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value / 100);
}

export default function PreorderConfigurator() {
  const [quantity, setQuantity] = useState<AllowedPreorderQuantity>(1);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [startingCheckout, setStartingCheckout] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [account, setAccount] = useState<ConnectedAccount | null>(null);
  const [loadingAccount, setLoadingAccount] = useState(true);

  const checkoutEnabled = preorderConfig.preorderOpen || import.meta.env.DEV;

  useEffect(() => {
    let active = true;

    async function loadAccount() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) return;

      if (!session) {
        setAccount(null);
        setLoadingAccount(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!active) return;

      setAccount({
        email: session.user.email ?? "Angemeldetes Profil",
        nickname: profile?.nickname ?? "Profil",
        accessToken: session.access_token,
      });
      setLoadingAccount(false);
    }

    loadAccount();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => loadAccount());

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadQuote() {
      setLoadingQuote(true);
      setErrorMessage("");

      try {
        const response = await fetch("/api/preorder/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
          signal: controller.signal,
        });

        const result = (await response.json()) as {
          quote?: Quote;
          error?: string;
        };

        if (!response.ok || !result.quote) {
          throw new Error(
            result.error ?? "Der Preis konnte nicht geladen werden."
          );
        }

        setQuote(result.quote);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setQuote(null);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Der Preis konnte nicht geladen werden."
        );
      } finally {
        if (!controller.signal.aborted) setLoadingQuote(false);
      }
    }

    loadQuote();
    return () => controller.abort();
  }, [quantity]);

  async function startCheckout() {
    if (!quote || !account || startingCheckout || !checkoutEnabled) return;

    setStartingCheckout(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/preorder/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account.accessToken}`,
        },
        body: JSON.stringify({ quantity }),
      });

      const result = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !result.checkoutUrl) {
        throw new Error(
          result.error ?? "Der Checkout konnte nicht gestartet werden."
        );
      }

      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Der Checkout konnte nicht gestartet werden."
      );
      setStartingCheckout(false);
    }
  }

  return (
    <div className="preorder-configurator">
      <div className="presale-badge">Presale</div>

      <div className="price-row">
        <div>
          <span className="price-label">Presale-Preis pro Deck</span>
          <strong className="current-price">
            {quote ? formatCents(quote.unitPriceCents) : "12,00 €"}
          </strong>
        </div>

        <div className="regular-price-box">
          <span>Später</span>
          <strong>
            {preorderConfig.regularPrice.toFixed(2).replace(".", ",")} €
          </strong>
          <small>pro Deck</small>
        </div>
      </div>

      <fieldset className="quantity-field">
        <legend>Anzahl der Decks</legend>

        <div className="quantity-options" role="radiogroup" aria-label="Anzahl der Decks">
          {preorderConfig.allowedQuantities.map((amount) => {
            const isSelected = quantity === amount;
            const previewTotal =
              amount * preorderConfig.presalePrice + preorderConfig.shippingCost;

            return (
              <button
                key={amount}
                type="button"
                className={isSelected ? "quantity-option is-selected" : "quantity-option"}
                role="radio"
                aria-checked={isSelected}
                onClick={() => setQuantity(amount)}
              >
                <span className="quantity-option-number">{amount}</span>
                <span className="quantity-option-label">
                  {amount === 1 ? "Deck" : "Decks"}
                </span>
                <small>{previewTotal.toFixed(2).replace(".", ",")} € gesamt</small>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="order-summary" aria-live="polite" aria-busy={loadingQuote}>
        {loadingQuote ? (
          <p className="quote-status">Preis wird sicher berechnet …</p>
        ) : quote ? (
          <>
            <div>
              <span>{quote.quantity} {quote.quantity === 1 ? "Deck" : "Decks"}</span>
              <strong>{formatCents(quote.subtotalCents)}</strong>
            </div>
            <div>
              <span>Versand</span>
              <strong>{formatCents(quote.shippingCostCents)}</strong>
            </div>
            <div className="order-total">
              <span>Gesamt</span>
              <strong>{formatCents(quote.totalCents)}</strong>
            </div>
          </>
        ) : null}
      </div>

      <section className="checkout-account" aria-live="polite">
        <span>Digitaler Zugang für</span>
        {loadingAccount ? (
          <p>Profil wird geprüft …</p>
        ) : account ? (
          <div>
            <strong>{account.nickname}</strong>
            <small>{account.email}</small>
            <a href="/account/login?returnTo=%2Fpreorder">Anderes Profil verwenden</a>
          </div>
        ) : (
          <div>
            <strong>Bitte zuerst einloggen</strong>
            <small>
              Dein Kauf schaltet alle 54 Argumente und den Käuferbereich frei.
            </small>
            <div className="checkout-account-actions">
              <a href="/account/login?returnTo=%2Fpreorder">Einloggen</a>
              <a href="/account/register?returnTo=%2Fpreorder">Profil erstellen</a>
            </div>
          </div>
        )}
      </section>

      {errorMessage && (
        <p className="checkout-error" role="alert">{errorMessage}</p>
      )}

      <p className="shipping-note">
        Die Versandkosten betragen pauschal <strong>
          {preorderConfig.shippingCost.toFixed(2).replace(".", ",")} €
        </strong> pro Bestellung – unabhängig von der Stückzahl.
      </p>

      <button
        className="checkout-button"
        type="button"
        disabled={!checkoutEnabled || loadingQuote || loadingAccount || startingCheckout || !quote || !account}
        onClick={startCheckout}
      >
        {startingCheckout
          ? "Stripe wird geöffnet …"
          : import.meta.env.DEV
            ? account ? "Testzahlung mit Stripe" : "Zum Bezahlen einloggen"
            : preorderConfig.preorderOpen
              ? account ? "Jetzt vorbestellen" : "Zum Bezahlen einloggen"
              : "Vorbestellung öffnet bald"}
      </button>

      <p className="checkout-hint">
        {import.meta.env.DEV
          ? "Lokaler Testmodus: Es wird kein echtes Geld abgebucht."
          : "Die Zahlung wird sicher über Stripe Checkout verarbeitet."}
      </p>

      <div className="bulk-order-note">
        <strong>Mehr als vier Decks benötigt?</strong>
        <p>
          Größere Bestellungen sind auf Anfrage möglich, zum Beispiel für Schulen,
          Vereine, Veranstaltungen oder Verkaufsstände.
        </p>
        <a href={`mailto:${preorderConfig.contactEmail}`}>
          Größere Stückzahl anfragen
        </a>
      </div>
    </div>
  );
}
