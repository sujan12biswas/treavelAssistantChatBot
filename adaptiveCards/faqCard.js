module.exports = {
    faqCard : async()=>{
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
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Cancel",
                            "data": { action: "cancel" }
                        }
                    ]
                }
            ]
        }
    }
}