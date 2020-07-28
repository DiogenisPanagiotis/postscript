import React, { Component } from 'react';
import '../App.css'

class Preview extends Component {
    constructor() {
        super();
        this.state = {
            current: null,
        };
        this.sendCampaign = this.sendCampaign.bind(this);
        this.draftCampaign = this.draftCampaign.bind(this);
    }

    sendCampaign = () => {
        const { campaigns, toggleCreate, campaignID } = this.props;
        const { 
            campaignName,
            media,
            message,
        } = this.props.data;

        this.props.saveCampaign({
            id: campaignID ? campaignID : campaigns.length,
            name: campaignName || 'Untitled Campaign',
            text: message,
            status: "Sent",
            media: media,
        }, campaignID ? campaignID + 1 : campaigns.length + 1);

        toggleCreate();
    }

    draftCampaign = () => {
        const { campaigns, toggleCreate, campaignID } = this.props;
        const { 
            campaignName,
            media,
            message,
        } = this.props.data;

        toggleCreate();

        this.props.saveCampaign({
            id: campaignID ? campaignID : campaigns.length,
            name: campaignName || 'Untitled Campaign',
            text: message,
            status: "Preview",
            media: media,
        }, campaignID ? campaignID + 1 : campaigns.length + 1); 
    }

    render() {
        const { 
            campaignName,
            segment,
            message,
            media,
        } = this.props.data;

        return (
            <div className="preview">
                <div className="preview-container">
                    <div className="preview-campaign-tag">Campaign: </div>
                    <div className="preview-campaign">{campaignName}</div>
                </div>
                <div className="preview-container">
                    <div className="preview-segment-tag">Segment: </div>
                    <div className="preview-segment">{segment}</div>
                </div>
                <div className="preview-container">
                    <div className="preview-message-tag">Message: </div>
                    <div className="preview-message">{message}</div>
                </div>
                <div className="preview-container">
                    <div className="preview-media-tag">Media: </div>
                    <div className="preview-media">{`${media.slice(0, 39)}...`}</div>
                </div>
                <div className="cancel-button" onClick={this.draftCampaign}>Back to Campaigns (Save Draft)</div>
                <div className="save-button" onClick={this.sendCampaign}>Send Campaign!</div>
            </div>
        );
    }
}

export default Preview;