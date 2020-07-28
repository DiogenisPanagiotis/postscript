import React, { Component } from 'react';
import Create from './Create';
import '../App.css'

class Campaigns extends Component {

    renderCampaigns = (status) => {
        const { campaigns, editCampaign } = this.props;
        return (
            <div>
                {campaigns.map((campaign, idx) => {
                    if (campaign.status === status) {
                        const stats = campaign.stats ? campaign.stats : null;
                        return (
                            <div className="campaign-group" key={idx}>
                                <div className="campaign-title">{`${campaign.name}`}</div>
                                <div className={`campaign-status-${campaign.status.toLowerCase()}`}>{`${campaign.status}`}</div>
                                {campaign.status === 'Sent' ? <div className="campaign-sent">{`${stats ? stats.sent : 0} (Sent)`}</div> : null}
                                {campaign.status === 'Sent' ? <div className="campaign-clicked">{`${stats ? stats.clicked : 0} (Clicked)`}</div> : null}
                                {campaign.status === 'Preview' ? <div className="campaign-edit" onClick={editCampaign.bind(this, idx)}>Edit</div> : null}
                            </div>
                        );
                    }
                })}
            </div>
        )
    }

    renderView = () => {
        const { create, campaigns, saveCampaign, toggleCreate, campaignID } = this.props;
        if (create) {
            return (
                <Create 
                    toggleCreate={toggleCreate}
                    saveCampaign={saveCampaign}
                    campaigns={campaigns}
                    campaignID={campaignID}
                />
            )
        }
        return (
            <div className="inventory">
                <div className="sub-title">Open Campaigns</div>
                {this.renderCampaigns("Preview")}
                <div className="sub-title">Sent Campaigns</div>
                {this.renderCampaigns("Sent")}
            </div>
        )
    }

    render() {
        return (
            <div className="campaigns">
                {this.renderView()}
            </div>
        );
    }
}

export default Campaigns;