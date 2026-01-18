describe('Проверяем доступность приложения', function() {
  it('сервис должен быть доступен по адресу localhost:5173', function() {
    cy.visit('/');
  });
});

describe('Тесты с моковыми данными', () => {
  beforeEach(() => {
    // Перехватываем запрос и используем fixture напрямую
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'mockIngredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен отобразить секцию ингредиентов', () => {
    cy.get('[data-cy="ingredients-section"]').should('be.visible');
  });

  it('должен отобразить три категории ингредиентов', () => {
    // Проверяем, что есть 3 списка (булки, начинки, соусы)
    cy.get('[data-cy="ingredients-list"]').should('have.length', 3);
  });

  it('должен отобразить правильное количество ингредиентов в каждой категории', () => {
    // Булки - 2 шт
    cy.get('[data-cy="ingredients-list"]')
      .eq(0)
      .find('[data-cy="ingredient-item"]')
      .should('have.length', 2);

    // Начинки - 9 шт
    cy.get('[data-cy="ingredients-list"]')
      .eq(1)
      .find('[data-cy="ingredient-item"]')
      .should('have.length', 9);

    // Соусы - 4 шт
    cy.get('[data-cy="ingredients-list"]')
      .eq(2)
      .find('[data-cy="ingredient-item"]')
      .should('have.length', 4);
  });

  it('должен отобразить 15 ингредиентов', () => {
    cy.get('[data-cy="ingredient-item"]').should('have.length', 15);
  });

  it('должен содержать название и цену ингредиента', () => {
    cy.get('[data-cy="ingredient-item"]')
      .first()
      .should('contain', 'Краторная булка N-200i')
      .and('contain', '1255');
  });

  describe('Модальное окно ингредиента', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'mockIngredients.json'
      }).as('getIngredients');

      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('должно открыть модальное окно при клике на ингредиент', () => {
      cy.get('[data-cy="ingredient-item"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="ingredient-details"]').should('be.visible');
    });

    it('должно отобразить правильные данные ингредиента в модальном окне', () => {
      cy.get('[data-cy="ingredient-item"]').first().click();
      cy.get('[data-cy="ingredient-name"]')
        .should('contain', 'Краторная булка N-200i');
      cy.get('[data-cy="ingredient-calories"]').should('contain', '420');
      cy.get('[data-cy="ingredient-proteins"]').should('contain', '80');
      cy.get('[data-cy="ingredient-fat"]').should('contain', '24');
      cy.get('[data-cy="ingredient-carbohydrates"]').should('contain', '53');
      cy.get('[data-cy="ingredient-image"]')
        .should('have.attr', 'src')
        .and('include', 'bun-02-large.png');
    });

    it('должно изменить URL при открытии модального окна', () => {
      cy.get('[data-cy="ingredient-item"]').first().click();
      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');
    });

    it('должно закрыть модальное окно при клике на крестик', () => {
      cy.get('[data-cy="ingredient-item"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('должно закрыть модальное окно при клике на оверлей', () => {
      cy.get('[data-cy="ingredient-item"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('должно открыть страницу ингредиента по прямой ссылке без модального окна', () => {
      cy.visit('/ingredients/643d69a5c3f7b9001cfa093c');
      cy.get('[data-cy="ingredient-details"]').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').should('not.exist');
      cy.get('[data-cy="ingredient-name"]')
        .should('contain', 'Краторная булка N-200i');
    });
  });

  describe('Добавление ингредиентов в конструктор', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'mockIngredients.json'
      }).as('getIngredients');

      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('должен отобразить пустой конструктор', () => {
      cy.get('[data-cy="burger-constructor"]').should('be.visible');
      cy.get('[data-cy="constructor-bun-top-empty"]').should('contain', 'Выберите булки');
      cy.get('[data-cy="constructor-ingredients-empty"]').should('contain', 'Выберите начинку');
      cy.get('[data-cy="constructor-bun-bottom-empty"]').should('contain', 'Выберите булки');
    });

    it('должен добавить булку в конструктор', () => {
      // Находим первую булку и кликаем на кнопку "Добавить"
      cy.contains('h3', 'Булки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Проверяем, что булка появилась сверху
      cy.get('[data-cy="constructor-bun-top"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i')
        .and('contain', '(верх)');

      // Проверяем, что булка появилась снизу
      cy.get('[data-cy="constructor-bun-bottom"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i')
        .and('contain', '(низ)');

      // Проверяем, что плейсхолдеры исчезли
      cy.get('[data-cy="constructor-bun-top-empty"]').should('not.exist');
      cy.get('[data-cy="constructor-bun-bottom-empty"]').should('not.exist');
    });

    it('должен заменить булку при добавлении другой булки', () => {
      // Добавляем первую булку
      cy.contains('h3', 'Булки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      cy.get('[data-cy="constructor-bun-top"]')
        .should('contain', 'Краторная булка N-200i');

      // Добавляем вторую булку
      cy.contains('h3', 'Булки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .eq(1)
        .contains('Добавить')
        .click();

      // Проверяем, что булка заменилась
      cy.get('[data-cy="constructor-bun-top"]')
        .should('contain', 'Флюоресцентная булка R2-D3')
        .and('not.contain', 'Краторная булка N-200i');
    });

    it('должен добавить начинку в конструктор', () => {
      // Добавляем начинку
      cy.contains('h3', 'Начинки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Проверяем, что начинка появилась
      cy.get('[data-cy="constructor-ingredients"]')
        .find('[data-cy="constructor-ingredient-item"]')
        .should('have.length', 1)
        .and('contain', 'Биокотлета из марсианской Магнолии');

      // Проверяем, что плейсхолдер исчез
      cy.get('[data-cy="constructor-ingredients-empty"]').should('not.exist');
    });

    it('должен добавить соус в конструктор', () => {
      // Добавляем соус
      cy.contains('h3', 'Соусы')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Проверяем, что соус появился
      cy.get('[data-cy="constructor-ingredients"]')
        .find('[data-cy="constructor-ingredient-item"]')
        .should('have.length', 1)
        .and('contain', 'Соус Spicy-X');
    });

    it('должен добавить несколько ингредиентов', () => {
      // Добавляем булку
      cy.contains('h3', 'Булки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Добавляем начинку
      cy.contains('h3', 'Начинки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Добавляем соус
      cy.contains('h3', 'Соусы')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Добавляем еще одну начинку
      cy.contains('h3', 'Начинки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .eq(1)
        .contains('Добавить')
        .click();

      // Проверяем булку
      cy.get('[data-cy="constructor-bun-top"]').should('be.visible');
      cy.get('[data-cy="constructor-bun-bottom"]').should('be.visible');

      // Проверяем количество ингредиентов (соус + 2 начинки)
      cy.get('[data-cy="constructor-ingredient-item"]').should('have.length', 3);
    });

    it('должен правильно рассчитать стоимость бургера', () => {
      // Добавляем булку (1255 * 2 = 2510)
      cy.contains('h3', 'Булки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Добавляем начинку (424)
      cy.contains('h3', 'Начинки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Добавляем соус (90)
      cy.contains('h3', 'Соусы')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Проверяем итоговую цену (2510 + 424 + 90 = 3024)
      cy.get('[data-cy="constructor-price"]').should('contain', '3024');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      // Перехватываем запрос ингредиентов
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'mockIngredients.json'
      }).as('getIngredients');

      // Перехватываем запрос данных пользователя
      cy.intercept('GET', 'api/auth/user', {
        fixture: 'mockUser.json'
      }).as('getUser');

      // Перехватываем запрос создания заказа
      cy.intercept('POST', 'api/orders', {
        fixture: 'mockOrder.json'
      }).as('createOrder');

      // Устанавливаем моковые токены
      cy.setCookie('accessToken', 'mock-access-token');
      window.localStorage.setItem('refreshToken', 'mock-refresh-token');

      cy.visit('/');
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      // Очищаем куки и localStorage после каждого теста
      cy.clearCookies();
      cy.clearLocalStorage();
    });

    it('должен создать заказ с булкой и ингредиентами', () => {
      // Собираем бургер: добавляем булку
      cy.contains('h3', 'Булки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Проверяем, что булка добавилась
      cy.get('[data-cy="constructor-bun-top"]').should('be.visible');
      cy.get('[data-cy="constructor-bun-bottom"]').should('be.visible');

      // Добавляем начинку
      cy.contains('h3', 'Начинки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Добавляем соус
      cy.contains('h3', 'Соусы')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Проверяем, что ингредиенты добавились
      cy.get('[data-cy="constructor-ingredient-item"]').should('have.length', 2);

      // Кликаем по кнопке "Оформить заказ"
      cy.get('[data-cy="order-button"]').click();

      // Ждем ответа от сервера
      cy.wait('@createOrder');

      // Проверяем, что модальное окно открылось
      cy.get('[data-cy="modal"]').should('be.visible');

      // Проверяем номер заказа
      cy.get('[data-cy="order-number"]').should('contain', '12345');

      // Закрываем модальное окно
      cy.get('[data-cy="modal-close-button"]').click();

      // Проверяем, что модальное окно закрылось
      cy.get('[data-cy="modal"]').should('not.exist');

      // Проверяем, что конструктор пуст
      cy.get('[data-cy="constructor-bun-top-empty"]').should('be.visible');
      cy.get('[data-cy="constructor-bun-bottom-empty"]').should('be.visible');
      cy.get('[data-cy="constructor-ingredients-empty"]').should('be.visible');
    });

    it('должен показать правильную цену перед оформлением заказа', () => {
      // Добавляем булку (1255 * 2)
      cy.contains('h3', 'Булки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Добавляем начинку (424)
      cy.contains('h3', 'Начинки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Добавляем соус (90)
      cy.contains('h3', 'Соусы')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Проверяем цену (2510 + 424 + 90 = 3024)
      cy.get('[data-cy="constructor-price"]').should('contain', '3024');

      // Оформляем заказ
      cy.get('[data-cy="order-button"]').click();
      cy.wait('@createOrder');

      // Проверяем модальное окно
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', '12345');
    });

    it('не должен создать заказ без авторизации', () => {
      // Очищаем куки (имитируем неавторизованного пользователя)
      cy.clearCookies();
      cy.clearLocalStorage();

      // Перехватываем запрос пользователя и возвращаем 401
      cy.intercept('GET', 'api/auth/user', {
        statusCode: 401,
        body: {
          success: false,
          message: 'Unauthorized'
        }
      }).as('getUserUnauthorized');

      cy.reload();
      cy.wait('@getIngredients');

      // Добавляем булку
      cy.contains('h3', 'Булки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Кликаем по кнопке оформления заказа
      cy.get('[data-cy="order-button"]').click();

      // Проверяем редирект на страницу логина
      cy.url().should('include', '/login');
    });

    it('не должен создать заказ без булки', () => {
      // Добавляем только начинку
      cy.contains('h3', 'Начинки')
        .next('[data-cy="ingredients-list"]')
        .find('[data-cy="ingredient-item"]')
        .first()
        .contains('Добавить')
        .click();

      // Кликаем по кнопке оформления заказа
      cy.get('[data-cy="order-button"]').click();

      // Проверяем, что запрос на создание заказа НЕ был отправлен
      cy.get('@createOrder.all').should('have.length', 0);

      // Модальное окно не должно открыться
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });
});
