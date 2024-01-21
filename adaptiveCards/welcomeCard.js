module.exports = {
    welcomeCard : async()=>{
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Welcome ",
                                            "wrap": true,
                                            "horizontalAlignment": "Center",
                                            "style": "heading",
                                            "size": "ExtraLarge",
                                            "color": "Attention",
                                            "weight": "Bolder"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "to Travel Bot",
                                            "wrap": true,
                                            "horizontalAlignment": "Center",
                                            "size": "Medium",
                                            "color": "Accent",
                                            "weight": "Default"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Book Ticket, Ticket Status, Cancel Ticket, Travel Destination Enquery and Weather Update",
                                            "wrap": true,
                                            "size": "Default",
                                            "color": "Good"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "url": "https://img.freepik.com/free-vector/detailed-travel-logo_23-2148627268.jpg?w=2000",
                                            "width": "120px",
                                            "height": "100px",
                                            "horizontalAlignment": "Center"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Ask FAQ ",
                            "data": { action: "askFAQ" }
                        }
                    ]
                }
            ]
        }
    }
}