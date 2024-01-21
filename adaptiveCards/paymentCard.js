module.exports = {
  paymentCard2: async () => {
    return {
      type: "AdaptiveCard",
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.3",
      body: [
        {
          type: "Container",
          items: [
            {
              type: "TextBlock",
              text: "Please, Complete the payment",
              wrap: true,
              size: "ExtraLarge",
              weight: "Bolder",
              color: "Attention",
              horizontalAlignment: "Center",
            },
            {
              type: "TextBlock",
              text: "Payment Amount   :   Rs. 2000",
              wrap: true,
              horizontalAlignment: "Center",
              size: "Medium",
              weight: "Bolder",
              color: "Accent",
            },
            {
              type: "Input.Text",
              placeholder: "Cardholder Name",
              id: "cardholderName",
            },
          ],
        },
        {
          type: "Input.Text",
          placeholder: "Card Number",
          id: "cardNumber",
        },
        {
          type: "ColumnSet",
          columns: [
            {
              type: "Column",
              width: "stretch",
              items: [
                {
                  type: "ColumnSet",
                  columns: [
                    {
                      type: "Column",
                      width: "stretch",
                      items: [
                        {
                          type: "Input.Text",
                          placeholder: "Month",
                          id: "month",
                        },
                      ],
                    },
                    {
                      type: "Column",
                      width: "stretch",
                      items: [
                        {
                          type: "Input.Text",
                          placeholder: "Year",
                          id: "year",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "Column",
              width: "stretch",
              items: [
                {
                  type: "Input.Number",
                  placeholder: "CVV",
                  id: "cvv",
                },
              ],
            },
          ],
        },
        {
          type: "ActionSet",
          id: "submit",
          actions: [
            {
              type: "Action.Submit",
              title: "Submit",
              data: { action: "submit" },
            },
          ],
        },
      ],
    };
  },
  paymentCard: async () => {
    return {
      type: "AdaptiveCard",
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.3",
      body: [
        {
          type: "Container",
          items: [
            {
              type: "TextBlock",
              text: "Please, Complete the payment",
              wrap: true,
              horizontalAlignment: "Center",
              style: "heading",
              size: "ExtraLarge",
              weight: "Bolder",
              color: "Attention",
            },
            {
              type: "TextBlock",
              text: "Payment Amount   :   Rs. 2000",
              wrap: true,
              size: "Medium",
              weight: "Bolder",
              color: "Accent",
              horizontalAlignment: "Center",
            },
            {
              type: "Input.Text",
              placeholder: "Cardholder Name",
            },
            {
              type: "Input.Number",
              placeholder: "Card Number",
            },
          ],
        },
        {
          type: "ColumnSet",
          columns: [
            {
              type: "Column",
              width: "stretch",
              items: [
                {
                  type: "Input.Date",
                },
              ],
            },
            {
              type: "Column",
              width: "stretch",
              items: [
                {
                  type: "Input.Number",
                  placeholder: "CVV",
                },
              ],
            },
          ],
        },
        {
          type: "Container",
          items: [
            {
              type: "ActionSet",
              actions: [
                {
                  type: "Action.Submit",
                  title: "Submit",
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
