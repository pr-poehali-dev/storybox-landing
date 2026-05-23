import LegalLayout from "./LegalLayout";

const PDF_URL =
  "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/27cb09b1-d9b1-4169-a3ea-d887f79f1d5c.pdf";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Политика конфиденциальности" pdfUrl={PDF_URL}>
      <p style={{ color: "#7A7A7A", marginBottom: 16 }}>
        Полный текст документа доступен для просмотра выше или для скачивания в формате PDF.
      </p>
      <p style={{ marginBottom: 12 }}>
        Настоящая Политика конфиденциальности описывает, каким образом ИП StoryBox собирает, использует
        и защищает персональные данные пользователей сайта и клиентов сервиса.
      </p>
      <p style={{ marginBottom: 12 }}>
        Используя наш сайт или оформляя заказ, вы соглашаетесь с условиями настоящей политики.
        Актуальная версия документа всегда доступна на данной странице.
      </p>
      <p style={{ color: "#7A7A7A", fontSize: 13 }}>
        По вопросам обработки персональных данных:{" "}
        <a href="mailto:hello@storybox.ru" style={{ color: "#00A4E3" }}>
          hello@storybox.ru
        </a>
      </p>
    </LegalLayout>
  );
}
