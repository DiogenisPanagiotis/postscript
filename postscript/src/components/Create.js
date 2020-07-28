import React, { Component } from 'react';
import data from '../data';
import Media from './Media';
import Preview from './Preview';
import '../App.css'

class Create extends Component {
    constructor(props) {
        super(props);

        const { campaigns, campaignID } = this.props;
        
        this.state = {
            campaignName: campaignID ? campaigns[campaignID].name : '',
            segment: 'All Subscribers',
            message: campaignID ? campaigns[campaignID].text : '',
            media: campaignID ? campaigns[campaignID].media : null,
            tag: '{shop_link}',
            showTagDropdown: false,
            showPreview: false,
        };
    }

    handleCampignNameChange = (e) => {
        this.setState({
            campaignName: e.target.value,
        });
    }

    handleSegmentChange = (e) => {
        this.setState({
            segment: e.target.value,
        });
    }

    handleTagChange = (e) => {
        this.setState({
            tag: e.target.value,
        });
    }

    handleMessageChange = (e) =>{
        this.setState({
            message: e.target.value,
        });
    }

    onClickAddTag = () => {
        this.setState({
            showTagDropdown: !this.state.showTagDropdown,
        });
    }

    insertTag = () => {
        const { message, tag } = this.state;
        this.setState({
            message: `${message} ${tag}`
        });
    }

    togglePreview = () => {
        this.setState({
            showPreview: !this.state.showPreview,
        });
    }

    fetchMedia = (media) => {
        this.setState({
            media: media
        });
    }

    renderSelectSegments = () => {
        const segments = data.segments;
        return (
            <div>
                <select name="" onChange={this.handleSegmentChange} value={this.state.segment}>
                    {segments.map((segment) => {
                        return <option key={segment.id} value={segment.name}>{`${segment.name} (${segment.subscribers_count})`}</option>
                    })}
                </select>
            </div>
        )
    }

    renderTags = () => {
        const tags = ["{shop_link}", "{first_name}", "{shop_name}"];
        if (this.state.showTagDropdown) {
            return (
                <div className="tag-dropdown">
                    {this.state.showTagDropdown ? <select className="tag-dropdown-select" onChange={this.handleTagChange} value={this.state.tag}>
                        {tags.map((tag, idx) => {
                            return <option key={idx} value={tag}>{tag}</option>
                        })}
                    </select> : null}
                    <div className="insert-tag-button" onClick={this.insertTag}>Insert Tag</div>
                </div>
            );
        }
    }

    renderTagButton = () => {
        return (
            <div className="add-tag-button" onClick={this.onClickAddTag}>Add Tag</div>
        );
    }

    renderContent = () => {
        const { message, showPreview } = this.state;
        const { campaigns, saveCampaign, toggleCreate, campaignID } = this.props;
        if (showPreview) {
            return (
                <Preview 
                    toggleCreate={toggleCreate} 
                    togglePreview={this.togglePreview} 
                    data={this.state} 
                    saveCampaign={saveCampaign}
                    campaigns={campaigns}
                    campaignID={campaignID}
                />
            );
        }
        return (
            <div>
                <div className="create-campaign-tag">Campaign Name</div>
                <input 
                    placeholder="Campaign Name"
                    className="create-campaign-input" 
                    onChange={this.handleCampignNameChange}
                    value={this.state.campaignName}
                />
                <div className="create-segment-tag">Segment Name</div>
                {this.renderSelectSegments()}
                <div className="create-message-tag">Message</div>
                <Media 
                    renderTags={this.renderTags}
                    renderTagButton={this.renderTagButton}
                    fetchMedia={this.fetchMedia}
                    media={campaignID ? campaigns[campaignID].media : null}
                />
                <input
                    placeholder="{shop_name}: Hi {first_name}! This is a sample text message."
                    className="create-message-input"
                    onChange={this.handleMessageChange}
                    value={message}
                />
                <div className="cancel-button" onClick={toggleCreate}>Cancel</div>
                <div className="save-button" onClick={this.togglePreview}>Save & Continue to Preview</div>
            </div>
        )
    }

    render() {
        return (
            <div className="create">
                {this.renderContent()}
            </div>
        );
    }
}

export default Create;