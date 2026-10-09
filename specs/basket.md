# Juice Shop Basket - Risk-Based E2E Plan

## Application Overview

Covers the three basket operations that would cost money if broken: adding a product, changing its quantity, removing it. Every scenario starts from tests/e2e/seed.spec.ts (fresh disposable customer, signed in, on /#/search, startup dialogs closed, empty basket: badge 0). Scenarios are independent: each one builds its own basket state through the UI and uses the unique per-run customer, so no data from other scenarios or earlier runs is needed. Prices observed on v20.1.1: Apple Juice (1000ml) 1.99¤. Out of scope: checkout, catalog search/paging, API-level basket contract (tracked separately in docs/coverage-matrix.md).

## Test Scenarios

### 1. Basket

**Seed:** `tests/e2e/seed.spec.ts`

#### 1.1. Add a product to the basket

**File:** `tests/e2e/basket/add-product.spec.ts`

**Steps:**
  1. Starting from the seed state, confirm the basket badge next to 'Your Basket' shows 0.
    - expect: Badge shows 0
  2. On the catalog, click 'Add to Basket' on the 'Apple Juice (1000ml)' card (1.99¤).
    - expect: A confirmation toast 'Placed Apple Juice (1000ml) into basket.' appears
    - expect: Basket badge changes to 1
  3. Click 'Show the shopping cart'.
    - expect: URL is /#/basket
    - expect: Heading 'Your Basket (<registered user email>)' is shown
    - expect: Exactly one row: 'Apple Juice (1000ml)', quantity 1, unit price 1.99¤
    - expect: 'Total Price: 1.99¤'
    - expect: Checkout button is enabled

#### 1.2. Change the quantity of a basket item

**File:** `tests/e2e/basket/change-quantity.spec.ts`

**Steps:**
  1. From the seed state, add 'Apple Juice (1000ml)' via 'Add to Basket' and open the basket.
    - expect: Row shows quantity 1 and 'Total Price: 1.99¤'
  2. Click the plus-square (increase) button on the row.
    - expect: Quantity shows 2
    - expect: Unit price column stays 1.99¤
    - expect: 'Total Price: 3.98¤'
  3. Click the minus-square (decrease) button on the row.
    - expect: Quantity shows 1
    - expect: 'Total Price: 1.99¤'
  4. Reload the page (F5) on /#/basket.
    - expect: Quantity and total persist from the server: quantity 1, 'Total Price: 1.99¤'

#### 1.3. Remove a product from the basket

**File:** `tests/e2e/basket/remove-product.spec.ts`

**Steps:**
  1. From the seed state, add 'Apple Juice (1000ml)', open the basket, and increase quantity to 2 (total 3.98¤).
    - expect: Row present with quantity 2
  2. Click the trash-alt (delete) button on the row, regardless of quantity.
    - expect: The whole line is removed regardless of quantity
    - expect: Table has no product rows
    - expect: 'Total Price: 0¤'
    - expect: Checkout button is disabled
    - expect: Basket badge shows 0
  3. Reload the page on /#/basket.
    - expect: Basket remains empty with total 0¤ and Checkout disabled (removal persisted)
